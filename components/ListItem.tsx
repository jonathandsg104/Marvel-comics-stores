import React from "react";
import Link from "next/link";


// Tipo User mínimo para evitar erro de build
type User = {
  id: number;
  name: string;
};

type Props = {
  data: User;
};

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    {data.id}:{data.name}
  </Link>
);

export default ListItem;
