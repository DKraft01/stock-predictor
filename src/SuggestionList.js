export default function SuggestionList(props) {
  if (props.inputlenght.length > 1 && props.sug) {
    return (
      <>
        <ul>
          {props.sug.map((e, i) => (
            <li onClick={() => props.click(e['1. symbol'])} key={i}>
              {e['2. name']}
            </li>
          ))}
        </ul>
      </>
    );
  } else return null;
}
