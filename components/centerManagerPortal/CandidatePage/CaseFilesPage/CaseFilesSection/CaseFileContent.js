import RichTextEditor from 'react-rte';

export default props => (
  <div>
    <RichTextEditor
      className={"form-control"}
      style={{border: 'none'}}
      value={RichTextEditor.createValueFromString(props.content, 'html')}
      rootStyle={{border: 'none'}}
      readOnly/>
  </div>
)
