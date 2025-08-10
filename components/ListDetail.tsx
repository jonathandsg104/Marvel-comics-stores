import * as React from "react";


// Tipo User mínimo para evitar erro de build
type User = {
  id: number;
  name: string;
};

type ListDetailProps = {
  item: User;
};

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;
