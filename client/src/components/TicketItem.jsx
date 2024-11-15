import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>Category: {ticket.category}</div>
      {ticket.category === "material" && <div>Option : {ticket.material}</div>}
      {ticket.category === "environment" && (
        <div>Option : {ticket.envirement}</div>
      )}
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default TicketItem;
