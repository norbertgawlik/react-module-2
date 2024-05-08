import { ChangeEventHandler, useState, type MouseEventHandler} from "react";
import { Input,Button } from "../../ui";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type FormData = {
    firstname : string,
    surname : string,
    birthdate : Date | null,
    hobby : string,
};

type ValidateData = {
    [key : string] : {
        error : boolean,
        errorTxt : string
    }
};

export const FormWizard = () => {
    const [activeStep, setActiveStep] = useState<number>(1);
    const [isDateSelected, setIsDateSelected] = useState<boolean>(true);

    const [formData,setFormData] = useState<FormData>({
        firstname : '',
        surname : '',
        birthdate : null,
        hobby : '',
    });

    const [validateData, setValidateData] = useState<ValidateData>({
        firstname : {error:false,errorTxt:'Add firstname!'},
        surname : {error:false,errorTxt:'Add surname!'},
        birthdate : {error:false,errorTxt:'Add birth date!'},
        hobby : {error:false,errorTxt:'Add hobby!'}
    });

    const handleChange : ChangeEventHandler<HTMLInputElement> = (e) =>{
        const id = e.target.id;
        const value = e.target.value;
        setFormData({
            ...formData,
            [id] : value
        });
    };

    const handleDateChange = (date: Date | null) => {
        if(date){
            setIsDateSelected(true);
            setFormData({
                ...formData,
                birthdate : date
            });
        }else{
            setIsDateSelected(false);
            setFormData({
                ...formData,
                birthdate : null
            });
        }
    };


    const handleSubmit : MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        switch(activeStep){
            case 1:
                checkField("firstname");
                checkField("surname");
                if(formData.firstname.length && 
                    formData.surname.length) setActiveStep(2);
            break;
            case 2:
                checkField("birthdate");
                checkField("hobby");
                if(formData.birthdate && formData.hobby.length) setActiveStep(3);
            break;
            case 3:
                console.log({
                    firstname : formData.firstname,
                    surname : formData.surname,
                    birthdate: formData.birthdate?.toString(),
                    hobby: formData.hobby
                });
            break;
        }
    };

    const checkField = (name : keyof FormData) => {
        if(formData[name] == ""){
            console.log('error');
            setValidateData(prev => ({
                ...prev,
                [name] : {
                    error : true,
                    errorTxt: prev[name].errorTxt
                }
            }));
        }else{
            setValidateData(prev => ({
                ...prev,
                [name] : {
                    error : false,
                    errorTxt: prev[name].errorTxt
                }
            }));
        }
    };

    return(
        <>
            <form>
                {activeStep === 1 &&
                <div className="step step1">
                    <Input 
                        name="firstname"
                        label="Name"
                        onChange={handleChange}
                    />
                    {validateData.firstname.error && 
                        <p className="text-sm uppercase text-red-500">
                            {validateData.firstname.errorTxt}
                        </p>
                    }
                    <Input 
                        name="surname"
                        label="Surname"
                        onChange={handleChange}
                    />
                    {validateData.surname.error && 
                        <p className="text-sm uppercase text-red-500">
                            {validateData.surname.errorTxt}
                        </p>
                    }
                    <Button onClick={handleSubmit} label="Next"/>
                </div>}
                {activeStep === 2 &&
                    <div className="step step2">
                        <DatePicker
                            selected={formData.birthdate}
                            onChange={(date : Date) => handleDateChange(date as Date)}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                        />
                        {!isDateSelected && <p className="text-sm text-red-500 my-2">Select a date!</p>}
                        <p>Selected Date: {formData.birthdate ? formData.birthdate.toLocaleDateString() : 'None'}</p>

                        {validateData.birthdate.error && 
                            <p className="text-sm uppercase text-red-500">
                                {validateData.biirthday.errorTxt}
                            </p>
                        }
                        <Input 
                            name="hobby"
                            label="Hobby"
                            onChange={handleChange}
                        />
                        {validateData.hobby.error && 
                            <p className="text-sm uppercase text-red-500">
                                {validateData.hobby.errorTxt}
                            </p>
                        }
                        <Button onClick={handleSubmit} label="Next"/>
                    </div>}
                    {activeStep === 3 &&
                    <div className="step step3">
                        Summary:
                        <p>Name: {formData.firstname}</p>
                        <p>Surname: {formData.surname}</p>
                        <p>Birthday: {formData.birthdate?.toLocaleDateString().toString()}</p>
                        <p>Hobby: {formData.hobby}</p>
                        <Button onClick={handleSubmit} label="Send"/>
                    </div>}
            </form>
        </>
    )
};