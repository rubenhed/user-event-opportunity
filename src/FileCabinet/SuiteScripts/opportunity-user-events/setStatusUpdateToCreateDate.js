/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

// sets custbody_ga_status_update_date to trandate for opportunities that don't have it set
define(['N/record', 'N/search', 'N/log'],

  (record, search, log) => {
    const onRequest = (scriptContext) => {
      const opportunitySearch = search.create({
        type: search.Type.OPPORTUNITY,
        columns: ['internalid', 'custbody_ga_status_update_date', 'trandate']
      });

      opportunitySearch.run().each(result => {
        const opportunityId = result.getValue({ name: 'internalid' });
        const opportunityRecord = record.load({
          type: record.Type.OPPORTUNITY,
          id: opportunityId
        });

        const opportunityUpdateDate = result.getValue({ name: 'custbody_ga_status_update_date' });
        if (opportunityUpdateDate) return true;

        const opportunityCreateDate = result.getValue({ name: 'trandate' });
        opportunityRecord.setValue({
          fieldId: 'custbody_ga_status_update_date',
          value: new Date(opportunityCreateDate)
        });

        log.audit("details", `update date: ${opportunityUpdateDate}, create date: ${opportunityCreateDate}, id: ${opportunityId}`);
        opportunityRecord.save();
        return true;
      });
    }

    return { onRequest }

  });
