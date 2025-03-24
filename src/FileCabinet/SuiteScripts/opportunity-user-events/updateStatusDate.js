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

      if (newEntityStatus !== oldEntityStatus) {
        const date = new Date(new Date().getTime() + (9 * 60 * 60 * 1000));

        newRecord.setValue({
          fieldId: 'custbody_ga_status_update_date',
          value: date
        });
      }
    }

    return { beforeSubmit }

  });
