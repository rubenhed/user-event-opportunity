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

      const newStatusId = 31; // 2.見積提出実績有
      opportunityRecord.setValue('entitystatus', newStatusId);

      const date = new Date(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));
      opportunityRecord.setValue({
        fieldId: 'custbody_ga_status_update_date',
        value: date
      });

      opportunityRecord.save();
    }

    return { afterSubmit }

  });
