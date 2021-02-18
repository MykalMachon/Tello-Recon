import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { ButtonGroup, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <IconButton
        aria-label="Decrement Counter"
        onClick={decrementCount}
        icon={<MinusIcon />}
      />
      <Input
        value={count}
        size="sm"
        isReadOnly
        width="3.25rem"
        textAlign="center"
      />
      <IconButton
        aria-label="Increment Counter"
        onClick={incrementCount}
        icon={<AddIcon />}
      />
    </ButtonGroup>
  );
};

export default Counter;
