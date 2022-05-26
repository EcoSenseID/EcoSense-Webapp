import React from "react";
import { useRouter } from "next/router";

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";

const ExitAlertDialog = ({ isOpen, onClose }) => {
    const cancelRef = React.useRef()
    const router = useRouter();

    const handleExit = () => {
        onClose();
        router.push('/dashboard/campaigns');
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Confirm Exit?
                </AlertDialogHeader>

                <AlertDialogBody>
                Are you sure? You have added several data in this page.
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={handleExit} ml={3}>
                    Exit
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ExitAlertDialog;