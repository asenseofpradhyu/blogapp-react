import { Button, Container, Form } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';


//Local imports
import CustomInputText from "../components/customInputText";
import { getDesignationLocalStore, getNameLocalStore, saveDesignationLocalStore, saveNameLocalStore } from "../utils/local_storage";

function Profile() {

    const { Formik } = formik;
    const schema = yup.object().shape({
      name: yup.string().required(),
      designation: yup.string().required(),
    });

    const onSubmitProfile = (formValues) => {
      saveNameLocalStore(formValues.name);
      saveDesignationLocalStore(formValues.designation);
      console.log("Submitted ",formValues);
    }

 
  return (
        <div className="main-content">
      <Container>
        <h2 className="mb-4">Your Profile</h2>
    <Formik
      validationSchema={schema}
      onSubmit={(values) => onSubmitProfile(values)}
      initialValues={{
        name: getNameLocalStore() ? getNameLocalStore() : '',
        designation: getDesignationLocalStore() ? getDesignationLocalStore() : '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          
             <CustomInputText 
          inputLabel={"Name"}
            inputPlaceholder={"Enter your Name"}
            inputType={"text"}
            inputValidationMsg={"Please add your Name"}
            inputValue={values.name}
            inputOnChange={handleChange}
            inputIsValid={touched.name && errors.name}
            inputFieldname={'name'}
            />
            <CustomInputText 
          inputLabel={"Designation"}
            inputPlaceholder={"Enter your designation"}
            inputType={"text"}
            inputValidationMsg={"Please add your designation"}
            inputValue={values.designation}
            inputOnChange={handleChange}
            inputIsValid={touched.designation && errors.designation}
            inputFieldname={'designation'}
            />
          <Button type="submit" className="btn btn-primary btn-custom w-100">Save Profile</Button>

        </Form>
      )}
    </Formik>
    </Container>
    </div>
  );

}

export default Profile;
