import { useEffect } from "react";

const SearchUsers = ({ userResults }) => {
  return (
    <>
      {userResults?.map((user) => {
        return (
          <ul>
            <li className="search-user-card">
              <div className="user-image-container">
                <img
                  id={user.profileImageUrl ? "user-image" : "user-image-search"}
                  src={user.profileImageUrl}
                ></img>
              </div>
              <div>
                <h4>{user.username}</h4>
                <p></p>
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default SearchUsers;
