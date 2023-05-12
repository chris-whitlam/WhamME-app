import { useCallback, useState } from 'react';
import useBLE from './useBLE';
import { useToast } from './useToast';
import {
  EXPRESSION_CHARACTERISTIC_UUID,
  PROGRAM_CHARACTERISTIC_UUID
} from '../constants';

export const useControls = () => {
  const { sendMessage } = useBLE();
  const { showError } = useToast();
  const [program, setCurrentProgram] = useState<number>();
  const [expression, setCurrentExpression] = useState<number>();

  const setProgram = useCallback(
    async (programId: number) => {
      console.log(programId);
      try {
        await sendMessage(programId.toString(), PROGRAM_CHARACTERISTIC_UUID);
        setCurrentProgram(programId);
      } catch (error: any) {
        showError(error.message);
      }
    },
    [sendMessage, showError]
  );

  const setExpression = useCallback(
    async (value: number) => {
      try {
        if (expression === value) {
          return;
        }

        await sendMessage(value.toString(), EXPRESSION_CHARACTERISTIC_UUID);
        setCurrentExpression(value);
      } catch (error: any) {
        showError(error.message);
      }
    },
    [expression, sendMessage, showError]
  );

  return { program, expression, setExpression, setProgram };
};
