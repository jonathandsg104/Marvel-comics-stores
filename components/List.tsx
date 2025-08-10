import * as React from "react";
import ListItem from "./ListItem";

// Tipo User mínimo para evitar erro de build
type User = {
  id: number;
  name: string;
};

type Props = {
  items: User[];
};

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
