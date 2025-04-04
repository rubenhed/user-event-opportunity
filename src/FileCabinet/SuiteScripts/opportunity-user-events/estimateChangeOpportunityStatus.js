/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],

  (record) => {

    const afterSubmit = (scriptContext) => {
      if (scriptContext.type !== scriptContext.UserEventType.CREATE) return;

      const estimateRecord = scriptContext.newRecord;
      const opportunityId = estimateRecord.getValue('opportunity');
      if (!opportunityId) return;

      const opportunityRecord = record.load({
        type: record.Type.OPPORTUNITY,
        id: opportunityId
      });

      const newStatusId = 8; // 3.見積発行済 // id: 31 for SB1, 8 for honban
      opportunityRecord.setValue('entitystatus', newStatusId);

      const date = new Date;
      opportunityRecord.setValue({
        fieldId: 'custbody_ga_status_update_date',
        value: date
      });

      opportunityRecord.save();
    }

    return { afterSubmit }

  });
