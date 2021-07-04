import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'add your nickname',
  emptyMsg = 'input is empty',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);

  const [isEditable, setIsEditabe] = useState(false);

  const onEditClick = useCallback(() => {
    // eslint-disable-next-line arrow-body-style
    setIsEditabe(p => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSaveClick = async () => {
    const trimmed = input.trim();
    if (trimmed === '') {
      Alert.info(emptyMsg, 4000);
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
    setIsEditabe(false);
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          Edit
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
