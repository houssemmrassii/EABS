import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const PhoneNumberInput: React.FC = () => {
  const [phone, setPhone] = React.useState("");
  return (
    <div>
      <PhoneInput
        defaultCountry="fr"
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
    </div>
  );
};

export default PhoneNumberInput;
