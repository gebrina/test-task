import {useState } from 'react';
import './tax.css';
import {Formik,Form,FieldArray,Field} from 'formik';
 //resource
 import resource from '../resource/resource.json';
//serach icon

import search from '../../assets/images/search.png';


const Tax = () =>{
 const [searchedItem,setSearchedItem] = useState('');
 const bracelet = 'Bracelets';
 const recurring = " "
 const braceletData = resource.filter((item)=>{
  return item.name.toLowerCase().includes('bracelet');
 });
 const recurringData = resource.filter((item)=>{
  return item.name.toLowerCase().includes('item');
 })
 
return <div className='container'>
        <Formik
      initialValues={
          {
          name:'',
          rate:5/100,
          applicapble_items:[],
          applied_to:'some',
         }
      }
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={({ values }) => (
        <Form>
         <div>
             <p className='form-title'>Add Tax</p>
             <div className="form-group"> 
             <Field className='input-control'
                placeholder='Tax Name'
                type={'text'}  name="name" 
                value={values.name}
                      />
              <div>
            <Field className='percent-control' name={'rate'} type={'number'}  
               value={values.rate*100}
             />
             <span>%</span>
            </div>
            </div>
            
          <div className="applied-to">
          <div className=''>
               <Field id='all-items' name="applied_to"
                value={'all'}
               type={'radio'} 
               />
               <label htmlFor='all-items'>Apply to all items in collection</label>
            </div>

            <div>
              <Field id='specific-items'
               name="applied_to"
               value={'some'}
               defaultChecked={true}
                type={'radio'} 
                />
              <label htmlFor='specific-items'>Apply to specific items</label>
            </div>
          </div>
       

         <div className='main-contianer'>
            <div className='search-container'>
                 <img  className="serach-icon" alt={'Search Icon'}src={search} />
                <input className="search-input" type={'text'} value={searchedItem}
                 onChange={(e)=>setSearchedItem(e.target.value)}
                placeholder="Search Items"/>
            </div>

            <div className='items-container'>
              <div>
                      
             <FieldArray
                          name="applicapble_items"
                    render={arrayHelpers => (
                    
               <div>
 
                    <>
                      {braceletData.filter((item)=>{
                        return item.name.toLocaleLowerCase().
                        includes(searchedItem.toLowerCase())||
                         bracelet.toLocaleLowerCase().
                         includes(searchedItem.toLowerCase())
                      }).length>0?
                      <div className='parent'>
                      <input  type="checkbox" 
                       onChange={(e)=>{
                const elements = document.getElementsByName('applicapble_items');
                 for(let i= 0 ;i<elements.length;i++){
                   if(elements[i].id.toString().includes('bracelete')){
                     if(e.target.checked){
                           if(elements[i].checked){
                           }else{
                              arrayHelpers.push(elements[i].value)
                              elements[i].checked=true;
                           }
                     }else{
                      if(elements[i].checked){
                        for(let j=0;j<elements.length;j++){
                             arrayHelpers.remove(j);
                             elements[i].checked=false;
                        }
                      }else{
                            arrayHelpers.push(elements[i].value);
                            elements[i].checked=true;
                         }
                     }
                   }
                 }
                       }}
                      name="bracelet-items" id="bracelet-items"/>
                      <label htmlFor="bracelet-items">
                        {bracelet}
                       </label>
                       </div>:<>
                       </>}
                      </>
                      
                {braceletData.filter((item)=>{
                      return item.name.toLocaleLowerCase().
                      includes(searchedItem.toLowerCase())||
                       bracelet.toLocaleLowerCase().
                       includes(searchedItem.toLowerCase())
                    }).map((item,index) => (
                   <div key={item.id} className="child">
                     
                      <input
                        name="applicapble_items"
                        type="checkbox"
                        value={item.id}
                        id={`bracelete${index}`}
                        
                        onChange={e => {
                          if (e.target.checked){
                            arrayHelpers.push(item.id.toString());
                          }
                          else {
                            const idx = values.applicapble_items.indexOf(item.id.toString());
                            arrayHelpers.remove(idx);
                          }
                          const elements = document.getElementsByName('applicapble_items');
                          for(let i=0;i<elements.length;i++){
                            if(elements[i].id.toString().includes('bracelete')){
                              if(!elements[i].checked){
                                console.log('someone is not cheked')
                                document.querySelector('#bracelet-items').checked = false;
                                break;
                              }else{
                                document.querySelector('#bracelet-items').checked = true;
                              }
                            }
                          }
                        }}
                      />{" "}
                      
                      <label htmlFor={`bracelete${index}`}>
                              {item.name}
                            </label>
                    
                  </div>
                ))}
              </div>
            )}
          />

                  <FieldArray
                    name="applicapble_items"
                    render={arrayHelpers => (
                    
                    <div>
 
                    <>
                      {recurringData.filter((item)=>{
                        return item.name.toLocaleLowerCase().
                        includes(searchedItem.toLowerCase())||
                         bracelet.toLocaleLowerCase().
                         includes(searchedItem.toLowerCase())
                      }).length>0?
                      <div className='parent'>
                      <input  type="checkbox" 
                       name="recurring-items" id="recurring-items"
                       onChange={(e)=>{
                        const elements = document.getElementsByName('applicapble_items');
                        for(let i= 0 ;i<elements.length;i++){
                          if(elements[i].id.toString().includes('recurring')){
                            if(e.target.checked){
                                  if(elements[i].checked){
                                  }else{
                                     arrayHelpers.push(elements[i].value)
                                     elements[i].checked=true;
                                  }
                            }else{
                             if(elements[i].checked){
                               for(let j=0;j<elements.length;j++){
                                    arrayHelpers.remove(j);
                                    elements[i].checked=false;
                               }
                             }else{
                                   arrayHelpers.push(elements[i].value);
                                   elements[i].checked=true;
                                }
                            }
                          }
                        }
                      
                       }}
                     />
                      <label htmlFor="recurring-items">
                        {recurring}
                       </label>
                       </div>:<>
                       </>}
                      </>
                      
                {recurringData.filter((item)=>{
                      return item.name.toLocaleLowerCase().
                      includes(searchedItem.toLowerCase())||
                       bracelet.toLocaleLowerCase().
                       includes(searchedItem.toLowerCase())
                    }).map((item,index) => (
                   <div key={item.id} className="child">
                   
                      <input
                        name="applicapble_items"
                        type="checkbox"
                        value={item.id}
                        id={`recurring${index}`}
                        
                        onChange={e => {
                          if (e.target.checked){
                            arrayHelpers.push(item.id.toString());
                          }
                          else {
                            const idx = values.applicapble_items.indexOf(item.id.toString());
                            arrayHelpers.remove(idx);
                          }
                          const elements = document.getElementsByName('applicapble_items');
                          for(let i=0;i<elements.length;i++){
                            if(elements[i].id.toString().includes('recurring')){
                              if(!elements[i].checked){
                                document.querySelector('#recurring-items').checked = false;
                                break;
                              }else{
                                document.querySelector('#recurring-items').checked = true;
                              }
                            }
                          }
                        }}
                        
                      />{" "}
                      
                      <label htmlFor={`recurring${index}`}>
                             {item.name}
                            </label>
                    
                  </div>
                ))}
              </div>
            )}
          />

          </div>
       </div>
       </div>            
       </div>
       <button type='submit'>Apply tax to {values.applicapble_items.length} item(s)</button>
       </Form>
        )}
         />
    </div>
}

export default Tax;