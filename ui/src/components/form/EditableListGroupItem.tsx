import * as React from 'react';
import { ClipLoader } from 'react-spinners';
import { ListGroupItemText, Input } from 'reactstrap';

const EditButton = ({ field, onClick }) => (
  <a href="javascript:;" className="edit-btn float-right" onClick={onClick}>
    <i className="material-icons">edit</i>
  </a>
);

const SaveButton = ({ field, onClick }) => (
  <a href="javascript:;" className="save-btn float-right m-2 ml-4" onClick={onClick}>
    <i className="material-icons">check</i>
  </a>
);

export interface EditableListGroupItemProps {
  name: string;
  placeholder: string;
  value: string;
  isLoading?: boolean;
  onEdit?(): void;
  onSubmit(value): void;
}

export interface EditableListGroupItemState {
  editing?: boolean;
  inputValue?: string;
}

export default class EditableListGroupItem
  extends React.Component<EditableListGroupItemProps, EditableListGroupItemState>{
  state: EditableListGroupItemState = { editing: false };

  onEdit() {
    this.setState({ editing: true });

    if (this.props.onEdit) {
      this.props.onEdit();
    }
  }

  onSubmit() {
    this.setState({ editing: false });

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.inputValue);
    }
  }

  render() {
    const { name, placeholder, value, onEdit, isLoading } = this.props;
    const { editing, inputValue = value } = this.state;

    return (
      <ListGroupItemText tag="div" className="editable">
        {editing ? (
          <React.Fragment>
            <Input
              name={name}
              placeholder={placeholder}
              value={inputValue || ''}
              onChange={event => this.setState({ inputValue: event.target.value })} />
            <SaveButton field={name} onClick={() => this.onSubmit()} />
          </React.Fragment>
        ) : (
            <React.Fragment>
              <b>{value || placeholder}</b>
              {isLoading ? (
                <ClipLoader size={20} loading={true} />
              ) : (
                  <EditButton field={name} onClick={() => this.onEdit()} />
                )}
            </React.Fragment>
          )}
      </ListGroupItemText>
    );
  }
}
