import './form-input.styles.scss' ;

interface formtype 
{   
    label:string,
    type:string,
    required:boolean,
    onChange:any,
    name:string,
    value:string
}

const FormInput=({label, ...otherProps}:formtype) => {
    return(
        <div className="group">
            <input className="form-input" {...otherProps}/>
            {label && 
            <label className={`${
                otherProps.value.length ? 'shrink' : ''
                }form-input-label`}
            >
                {label}
            </label>}
            
         </div>
        
    )
}

export default FormInput