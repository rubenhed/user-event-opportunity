/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/log'],
  (record, log) => {
    const onRequest = (scriptContext) => {
      
      const opportunityRecord = record.load({
        type: record.Type.OPPORTUNITY,
        id: 426681
      });

      // Get the entity status field and its options
      const field = opportunityRecord.getValue({ fieldId: 'entitystatus' });
      log.audit(`fieldid: ${field}`);
    }

    return { onRequest }

  });
