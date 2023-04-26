import { useState } from "react";

interface FormValues {
  dimx: string;
  dimy: string;
  dimz: string;
}

interface dims {
  [key: number]: FormValues;
}
export default function Sandbox() {
  const [inputFields, setInputFields] = useState<FormValues[]>([{ dimx: "", dimy: "", dimz: "" }]);

  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let data: dims = [...inputFields];
    let name: string = event.target.name;

    name = "";
    data[index][name as keyof FormValues] = event.target.value;
    // setInputFields(data);
  };

  const addFields = () => {
    let newfield = { dimx: "", dimy: "", dimz: "" };

    setInputFields([...inputFields, newfield]);
  };

  return (
    <div className="App">
      <form>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name="dimx"
                placeholder="dimx"
                value={input.dimx}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                name="dimy"
                placeholder="dimy"
                value={input.dimy}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                name="dimz"
                placeholder="dimz"
                value={input.dimz}
                onChange={(event) => handleFormChange(index, event)}
              />
            </div>
          );
        })}
        <button onClick={addFields}>Add More..</button>
      </form>
    </div>
  );
}
