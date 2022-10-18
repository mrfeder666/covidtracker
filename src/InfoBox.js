import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import { prettyPrintStat } from "./util";

function InfoBox({ title, cases, total, active, ...props }) {
  return (
    <Card
      className={`infoBox ${active && "infoBox_selected"}`}
      onClick={props.onClick}
    >
      <CardContent>
        {/* title */}
        <Typography color="textSecondary" className="infoBox_title">
          {title}
        </Typography>
        {/* number of cases */}
        <h2 className="infoBox_cases"> {prettyPrintStat(cases)}</h2>
        {/* total */}
        <Typography className="infoBox_total" color="textSecondary">
          {prettyPrintStat(total)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
