import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const user = useSelector((state) => state.auth.user);
  const [category, setCategory] = useState("Material");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.log(message);
    }

    // redirect when logged in
    if (isSuccess) {
      console.log("Success");
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ category, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="section heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={user.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            id="name"
            value={user.email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Material">Material</option>
              <option value="Envirement">Envirement</option>
              <option value="PC">Other</option>
            </select>
          </div>
          {category === "Material" && (
            <div className="form-group">
              <label htmlFor="materialOptions">Material Options</label>
              <select name="materialOptions" id="materialOptions">
                <option value="Laptop">Laptop</option>
                <option value="Screen">Screen</option>
                <option value="Headset">Headset</option>
                <option value="Camera">Camera</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Mouse">Mouse</option>
                <option value="UsbHub">USB Hub</option>
                <option value="Network">Network Cable</option>
              </select>
            </div>
          )}

          {category === "Envirement" && (
            <div className="form-group">
              <label htmlFor="envirementOptions">Envirement Options</label>
              <select name="envirementOptions" id="envirementOptions">
                <option value="Teams">Teams</option>
                <option value="Outlook">Outlook</option>
                <option value="Browser">Browser</option>
                <option value="Excel">Excel</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required={category === "PC"}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
