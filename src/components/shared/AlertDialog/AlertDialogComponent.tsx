import { AlertDialog, Box, Button, Center } from "native-base";
import React from "react";

interface Props_ {
  body: string;
}
export const AlertDialogComponent: React.FC<Props_> = ({ body }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  console.log(body);
  const cancelRef = React.useRef(null);
  return (
    <Box flex="1">
      <Center>
        <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
          Delete Customer
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete Customer</AlertDialog.Header>
            <AlertDialog.Body>
              This will remove all data relating to Alex. This action cannot be
              reversed. Deleted data can not be recovered.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  ref={cancelRef}
                  colorScheme="coolGray"
                  onPress={onClose}
                  variant="unstyled"
                >
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={onClose}>
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </Box>
  );
};
