import { TextInput } from "@/components/input";
import SellerAdress from "./SellerAdress";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function CreateStripeAccount({
  stripeAccountForm,
  setStripeAccountForm,
  dateOfBirth,
  setDateOfBirth,
  stripeBankAccountForm,
  setStripeBankAccountForm,
  isAdressValid,
  setIsAdressValid,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStripeAccountForm({
      ...stripeAccountForm,
      individual: {
        ...stripeAccountForm.individual,
        [name]: value,
      },
    });
  };

  const handlePhoneChange = (phoneNumber) => {
    setStripeAccountForm({
      ...stripeAccountForm,
      individual: {
        ...stripeAccountForm.individual,
        phone: phoneNumber
      }
    });
  }

  return (
    <div className="col-span-2 lg:col-span-1">
      <h2 className="font-mcqueen text-[24px] font-bold">
        Informations vendeur
      </h2>
      <TextInput
        onChange={handleChange}
        label="Prénom"
        placeholder="Prénom"
        name="first_name"
        value={stripeAccountForm.individual.first_name}
        required
        className="mb-4 lg:mb-0"
      />
      <TextInput
        onChange={handleChange}
        label="Nom"
        placeholder="Nom"
        name="last_name"
        value={stripeAccountForm.individual.last_name}
        required
        className="mb-4 lg:mb-0"
      />
      <TextInput
        type="date"
        onChange={(e) => setDateOfBirth(e.target.value)}
        label="Date de naissance"
        placeholder="Date de naissance"
        name="dateOfBirth"
        value={dateOfBirth}
        required
        className="mb-4 lg:mb-0"
      />
      <p className="label font-mcqueen font-semibold">Téléphone :</p>
      <PhoneInput
        containerStyle={{
          borderBottom: '1px solid black'
        }}
        buttonStyle={{
          border: 'none',
          background: 'none'
        }}
        inputStyle={{
          border: 'none',
          background: 'none'
        }}
        country={'fr'}
        placeholder=""
        value={stripeAccountForm.individual.phone}
        onChange={phone => handlePhoneChange(`+${phone}`)}
      />  
      <TextInput
        onChange={(e) =>
          setStripeBankAccountForm({
            ...stripeBankAccountForm,
            account_number: e.target.value,
          })
        }
        label="IBAN"
        placeholder="FR********"
        name="IBAN"
        value={stripeBankAccountForm.account_number}
        required
      />
      <h3 className="font-mcqueen font-semibold mt-6">
        Adresse d’expédition :
      </h3>
      <SellerAdress
        isAdressValid={isAdressValid}
        setIsAdressValid={setIsAdressValid}
        address={stripeAccountForm.individual.address}
        setStripeAccountForm={setStripeAccountForm}
      />
    </div>
  );
}
