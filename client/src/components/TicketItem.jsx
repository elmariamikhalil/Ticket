import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket.category}</div>
      {ticket.category === "Material" && <div>{ticket.material}</div>}
      {ticket.category === "Environment" && <div>{ticket.envirement}</div>}
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default TicketItem;
