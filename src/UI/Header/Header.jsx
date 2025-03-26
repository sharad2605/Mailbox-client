import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Component/Store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <nav
      className="navbar navbar-dark bg-dark fixed-top px-3 d-flex justify-content-between"
      style={{ zIndex: 1000 }} // ✅ Correct way to use z-index
    >
      <a className="navbar-brand fw-bold text-white" href="#">
        My Mailbox
      </a>
      {isLoggedIn && (
        <button
          className="btn btn-danger"
          onClick={() => dispatch(authActions.logout())}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Header;
