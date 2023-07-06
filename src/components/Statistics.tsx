import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef} from "@mui/x-data-grid";

import React from "react";

type Props = {
    title: string;
    field: string;
    objects: any[];
}
const columns: GridColDef[] = [
    {
        field: "minValue", headerName: "Min", headerAlign: "center",
        align: "center", headerClassName: "header", flex: 1
    },
    {
        field: "maxValue", headerName: "Max", headerAlign: "center",
        align: "center", headerClassName: "header", flex: 1
    },
    {
        field: "employeeCount", headerName: "Amount, employees", headerAlign: "center",
        align: "center", headerClassName: "header", flex: 1
    },

    {
        field: "avgValue", headerName: "Avg", headerAlign: "center",
        align: "center", headerClassName: "header", flex: 1
    },

]

export const Statistics: React.FC<Props> = ({ title, field, objects }) => {
    let statistics: any = { id: 1 };
    if (objects.length > 0) {
      const initialObject: {
        minValue: number;
        maxValue: number;
        avgValue: number;
        employeeCount: number;
      } = {
        minValue: objects[0][field],
        maxValue: objects[0][field],
        avgValue: 0,
        employeeCount: objects.length,
      };
      statistics = objects.reduce(
        (res, cur) => {
          if (res.minValue > cur[field]) {
            res.minValue = cur[field];
          }
          if (res.maxValue < cur[field]) {
            res.maxValue = cur[field];
          }
          res.avgValue += cur[field];
          return res;
        },
       initialObject
      );
      statistics.id = 1;
      statistics.avgValue = Math.round((statistics.avgValue) / objects.length);
    }
  
    return (
      <Box sx={{ width: "50vw", height: "25vh", textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "1.8em",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <DataGrid columns={columns} rows={[statistics]} sx={{ ml: "5vw" }} />
      </Box>
    );
  };




export default Statistics;