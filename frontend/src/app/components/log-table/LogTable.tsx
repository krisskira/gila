import { FC } from "react";
import styles from "./logTable.module.scss";
import { MessageLog } from "../../interfaces";
import { Table } from "react-bootstrap";
interface Props {
  messagesLogs: MessageLog[];
}
export const LogTable: FC<Props> = ({ messagesLogs }) => {
  return (
    <Table
      className={`${styles.container}`}
      striped="columns"
      bordered
      hover
      size="sm"
    >
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Usuario</th>
          <th>Canal</th>
          <th>Subscripción</th>
          <th>Mensaje</th>
        </tr>
      </thead>
      <tbody>
        {messagesLogs.map((log) => {
          return (
            <tr key={`log-${log.id}`}>
              <td>{new Date(log.createdAt ?? Date.now()).toLocaleString()}</td>
              <td>{log.user}</td>
              <td>{log.channel}</td>
              <td>{log.category}</td>
              <td>{log.message}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
