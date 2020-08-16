import React from "react";
import {
    Modal,
    ModalBody,
    ModalButton,
    ModalFooter,
    ModalHeader,
    ROLE,
    SIZE,
} from "baseui/modal/index";
import { Input } from "baseui/input/index";
import { KIND as ButtonKind } from "baseui/button/index";

const AddVideoModal = ({
    addVideoModal,
    setAddVideoModal,
    handleAddVideoButtonClick,
}) => {
    const [videoURL, setVideoURL] = React.useState("");

    return (
        <Modal
            closeable={false}
            isOpen={addVideoModal}
            animate
            autoFocus
            unstable_ModalBackdropScroll
            size={SIZE.auto}
            role={ROLE.dialog}
        >
            <ModalHeader>Share New Video</ModalHeader>
            <ModalBody>
                <div style={{ width: 550 }}>
                    <Input
                        value={videoURL}
                        onChange={(e) => setVideoURL(e.target.value)}
                        placeholder="Enter YouTube URL Ex. https://www.youtube.com/watch?v=YnpJXfcSzOM"
                        clearOnEscape
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <ModalButton
                    kind={ButtonKind.tertiary}
                    onClick={(e) => {
                        e.stopPropagation();
                        setAddVideoModal(false);
                    }}
                >
                    Cancel
                </ModalButton>
                <ModalButton
                    disabled={!videoURL}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddVideoButtonClick(videoURL);
                    }}
                >
                    Add Video
                </ModalButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddVideoModal;
