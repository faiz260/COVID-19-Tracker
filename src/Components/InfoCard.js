import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoCard({ title, cases, total }) {
  return (
    <div>
      <Card className="infoCard">
        <CardContent>
          <Typography className="infoCard_title" color="textSecondary">
            {title}
          </Typography>
          <h2 className="infoCard_cases">{cases}</h2>
          <Typography className="infoCard_total">{total} Total</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoCard;
