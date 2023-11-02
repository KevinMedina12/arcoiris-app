import React from "react";
import { DataTable } from "react-native-paper";
import { Title } from "./Title";

interface Item {
  key: number;
  name: string;
  quantity: number;
  price: number;
  provider: string;
}

interface Props {
  items: Item[];
}

export const DataTableProducts: React.FC<Props> = ({ items }) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[2]
  );


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <DataTable style={{ marginTop: 20 }}>
      <DataTable.Header>
        <DataTable.Title>
          <Title size="sm" bold>
            PROD.
          </Title>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Title bold size="sm">
            ID
          </Title>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Title bold size="sm">
            CANT.
          </Title>
        </DataTable.Title>

        <DataTable.Title numeric>
          <Title bold size="sm">
            PVP{"  "}
          </Title>
        </DataTable.Title>

        <DataTable.Title>
          <Title bold size="sm">
            PROV.
          </Title>
        </DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>
            <Title size="sm">{item.name}</Title>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Title size="sm">{item.key}</Title>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Title size="sm">{item.quantity}</Title>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Title size="sm" bold color="#2FEA95">{`${item.price + "     "}`}</Title>
          </DataTable.Cell>
          <DataTable.Cell>
            <Title size="sm">{item.provider}</Title>
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        style={{ backgroundColor: "#f1f1f1" }}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </DataTable>
  );
};
