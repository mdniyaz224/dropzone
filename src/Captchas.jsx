import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
       

const Captchas = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleRecaptchaChange = (value) => {
    setIsVerified(true);
  };

  const handleSubmit = () => {
    if (isVerified) {
      // Perform your form submission or any other action here
      console.log('Form submitted successfully!');
    } else {
      alert('Please verify that you are not a robot.');
    }
  };

  return (
    <div>
      
     
      <form>
      
        <ReCAPTCHA
          sitekey="6LegCVcnAAAAADswXpDYGBlUO_XNsvXRN6kCsgbB"
          onChange={handleRecaptchaChange}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Captchas;
