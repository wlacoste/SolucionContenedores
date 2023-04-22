import type { IPerson } from "domain/Person";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableFooter from "@mui/material/TableFooter";

import styles from "./styles.module.scss";

interface IPersonTableProps {
  data: IPerson[];
}

export default function PersonTable({ data }: IPersonTableProps) {
  return (
    <section className={styles.root}>
      <section className={styles.actions}>{/* IconButton actions acá */}</section>
      <TableContainer className={styles.container} component={Paper}>
        <Table aria-label="collapsable table" className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell className={styles.cellActions}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {data.map(({ name, lastName, id }, i) => {
              return (
                <TableRow key={`table-row-${id}-${i}`}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{lastName}</TableCell>
                  <TableCell className={styles.cellActions}>
                    {/**
                     * Icon Button con actiosn especificas
                     */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow className={styles.rowPagination}>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </section>
  );
}
