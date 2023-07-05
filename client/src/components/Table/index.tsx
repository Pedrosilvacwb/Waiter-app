import { Container } from "./styles";

interface TableProps {
  headings: string[];
  values: {
    values: (string | undefined | number)[];
    actions: {
      name: string;
      icon: string;
      action: () => void;
    }[];
    images?: {
      path: string | undefined;
      name: string | undefined;
    };
  }[];
}

const Table = ({ headings, values }: TableProps) => {
  return (
    <Container>
      <thead>
        <tr>
          {headings.map((item) => (
            <th key={Math.random()}>
              <strong>{item}</strong>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((item) => (
          <tr key={Math.random()}>
            {item.images && (
              <td>
                <img
                  alt={item.images.name}
                  width={48}
                  height={32}
                  src={`http://192.168.0.13:3001/uploads/${item.images.path}`}
                />
              </td>
            )}

            {item.values.map((v) => (
              <td key={Math.random()}>{v}</td>
            ))}

            <td style={{ width: "10%" }}>
              {item.actions.map((item) => (
                <button key={item.name} onClick={item.action}>
                  <img src={item.icon} alt={item.name} />
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Container>
  );
};

export default Table;
