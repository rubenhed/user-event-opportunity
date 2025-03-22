/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([],

  () => {
    const beforeSubmit = (scriptContext) => {
      const newRecord = scriptContext.newRecord;
      const oldRecord = scriptContext.oldRecord;

      if (!oldRecord) return; //prevents error on creation

      const newEntityStatus = newRecord.getValue({ fieldId: 'entitystatus' });
      const oldEntityStatus = oldRecord.getValue({ fieldId: 'entitystatus' });

      //const testDate = new Date("2017-03-25");
      //let date = new Date();
      const date = new Date(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));

      if (newEntityStatus !== oldEntityStatus) {
        newRecord.setValue({
          fieldId: 'custbody_ga_status_update_date',
          value: date
        });
      }
    }

    return { beforeSubmit }

  });
