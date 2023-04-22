import usePerson from "app/person/use-person";

import PersonTable from "./components/Table";

export default function Person() {
  const person = usePerson();

  return <PersonTable data={person} />;
}
