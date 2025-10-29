document.querySelector('.DForm').style.height = '950px';
const dataSelect = custom1.model.rowDataSelect;
console.log('dataSelect', dataSelect)
let dataObject = {
  ...dataSelect,
  type: dataSelect["@type"] === 'PolicyAction' ? 'Composite' :
 'Atomic',
  actionValue : {
    ...dataSelect?.actionValue,
    operation: dataSelect?.operation,
    filter: dataSelect?.filter,
    fields: dataSelect?.fields,
    path: dataSelect?.path,
    "productOfferingPrice": dataSelect?.actionValue?.dataType === "Object" ? dataSelect?.actionValue?.value?.productOfferingPrice : {}
  }
};
console.log('data11', dataObject)
new window.DynamicFormProperty('.DForm', {
          formObject: jsonDFORM.value,
          dataObject: dataObject,
          onSubmitAPI: ({data}) => {
            console.log('datadata', data)
            const bodyRequest = {
              ...dataObject,
              ...data
            }
            console.log('bodyRequest', bodyRequest)
            Update.run({bodyRequest})
          },
          onOnClose: ()=> {
            alert('Xoa ne')
          },
          onActionValue: ({data})=> {
            console.log('datadataaction', data);
            let value = data.value;
            if(data?.dataType === "Object") {
              idPrdOffering.setValue(data.productOfferingPrice);
              setTimeout(()=> {
                console.log('idPrdOffering', idPrdOffering.value);
                
                let prd = getProductOfferingPrice.data;
                value = {
                  productOfferingPrice: {
                    ...prd,
                    "@referredType": "ProductOfferingPrice",
                  }
                }
                const bodyRequest = {
                    ...dataObject,
                    actionValue : {
                        "@type": "PolicyActionValue",
                        dataType :data?.dataType,
                        value: value,
                    }
                }
                put.run({bodyRequest})
            },300);
            }else {
                const bodyRequest = {
                    ...dataObject,
                    actionValue : {
                        "@type": "PolicyActionValue",
                        dataType :data?.dataType,
                        value: value,
                    }
                }
                put.run({bodyRequest})
            }
            
          }
      });
