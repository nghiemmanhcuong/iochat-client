import {Modal, useMantineTheme} from '@mantine/core';
import Share from '../Share/Share';

function ShareModal({openModal, onSetOpenModal}) {
    const theme = useMantineTheme();

    return (
        <Modal
            overlayColor={
                theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size='45%'
            opened={openModal}
            onClose={() => onSetOpenModal(false)}
        >
            <Share />
        </Modal>
    );
}

export default ShareModal;
