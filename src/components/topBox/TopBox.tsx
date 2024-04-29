import "./topBox.scss"
export type TopBoxProps =
  {
    id: number,
    img?: string,
    firstName: string,
    lastName: string,
    email: string,
    attendance: object[],
  }

const TopBox = (props: TopBoxProps[]) => {
  const data: TopBoxProps[] = [];
  for (const prop in props) {

    console.log(props[prop])
    data.push(props[prop])
  }
  console.log(data)

  return (
    <div className="topBox">
      <h1>Lecture Count Average</h1>
      <div className="list">
        {data.map(user => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} alt="" />
              <div className="userTexts">
                <span className="username">{user.firstName} {user.lastName}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">{user.attendance.length.toString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox