function UserData(props){
    return (
        <div className="m-2 p-2 border-b-2 border-black">
            <p>Ticker: {props.Ticker}</p>
            <p>Summary: {props.Summary}</p>
            <p>Sentiment: {props.Sentiment}</p>
            <p>Sentiment_Score: {props.Sentiment_Score}</p>
            <a href={props.URL} target=" ">URL: {props.URL}</a>
        </div>
    )
}

export default UserData;