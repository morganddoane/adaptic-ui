import React, { ReactElement, ReactNode } from 'react';
import Lottie from 'react-lottie';

import { makeStyles } from '@material-ui/core';

// Import all avaliable animation json files
import AError from './animations/error.json';
import AErrorPrimary from './animations/errorPrimary.json';
import ASuccess from './animations/success.json';
import ASuccessPrimary from './animations/successPrimary.json';
import AVerified from './animations/verified.json';
import AWarning from './animations/warning.json';
import AAirplane from './animations/airplane.json';
import APulse from './animations/pulse.json';
import ALoading from './animations/loading.json';
import ALoadingWhite from './animations/loadingWhite.json';
import AHelp from './animations/help.json';
import ABouncingArrow from './animations/bouncingArrow.json';
import ADotPulse from './animations/dotPulse.json';
import ABarcodeScanner from './animations/barcode.json';
import AWhiteSwipe from './animations/whiteSwipe.json';
import AAstron from './animations/astron.json';
import ALocked from './animations/locked.json';
import ANode1Primary from './animations/node1Primary.json';

import { EventListener } from 'react-lottie';
import { sleep } from 'utils/functions';

export enum LottieAnimationType {
    Error = 'Error',
    ErrorPrimary = 'ErrorPrimary',
    Success = 'Success',
    SuccessPrimary = 'SuccessPrimary',
    Verified = 'Verified',
    Warning = 'Warning',
    Airplane = 'Airplane',
    Help = 'Help',
    Pulse = 'Pulse',
    Loading = 'Loading',
    LoadingWhite = 'LoadingWhite',
    BouncingArrow = 'BouncingArrow',
    DotPulse = 'DotPulse',
    BarcodeScanner = 'BarcodeScanner',
    WhiteSwipe = 'WhiteSwipe',
    Astron = 'Astron',
    Locked = 'Locked',
    Node1Primary = 'Node1Primary',
}

const animationMap: Record<LottieAnimationType, ReactNode> = {
    [LottieAnimationType.Error]: AError,
    [LottieAnimationType.ErrorPrimary]: AErrorPrimary,
    [LottieAnimationType.Success]: ASuccess,
    [LottieAnimationType.SuccessPrimary]: ASuccessPrimary,
    [LottieAnimationType.Verified]: AVerified,
    [LottieAnimationType.Warning]: AWarning,
    [LottieAnimationType.Airplane]: AAirplane,
    [LottieAnimationType.Help]: AHelp,
    [LottieAnimationType.Pulse]: APulse,
    [LottieAnimationType.Loading]: ALoading,
    [LottieAnimationType.LoadingWhite]: ALoadingWhite,
    [LottieAnimationType.BouncingArrow]: ABouncingArrow,
    [LottieAnimationType.DotPulse]: ADotPulse,
    [LottieAnimationType.BarcodeScanner]: ABarcodeScanner,
    [LottieAnimationType.WhiteSwipe]: AWhiteSwipe,
    [LottieAnimationType.Astron]: AAstron,
    [LottieAnimationType.Locked]: ALocked,
    [LottieAnimationType.Node1Primary]: ANode1Primary,
};

const useStyles = makeStyles((theme) => ({
    root: {},
}));

interface IAnimationProps {
    animation: LottieAnimationType;

    // Lottie stuff
    height?: number;
    width?: number;
    loop?: boolean;
    autoplay?: boolean;
    onComplete?: () => void;
    delay?: number;
}

const LottieAnimation = (props: IAnimationProps): ReactElement => {
    const classes = useStyles();
    const {
        animation,
        height,
        width,
        loop,
        autoplay,
        onComplete,
        delay,
    } = props;

    if (loop == true && onComplete !== undefined) {
        throw new Error(
            'onComplete and loop should not be used together on LottieAnimation'
        );
    }

    if (delay && !onComplete) {
        throw new Error('Delay can only be used with onComplete');
    }

    const [waitForDelay, setWaitForDelay] = React.useState<boolean>(false);

    React.useEffect(() => {
        let keepWaiting = true;

        const delayComplete = async () => {
            await sleep(delay ? delay : 0);
            if (keepWaiting && onComplete) {
                onComplete();
            }
        };

        if (waitForDelay) delayComplete();

        return () => {
            keepWaiting = false;
        };
    }, [delay, waitForDelay, onComplete]);

    const getEventListeners = (): EventListener[] => {
        const listeners: EventListener[] = [];

        if (onComplete)
            listeners.push({
                eventName: 'complete',
                callback: () => setWaitForDelay(true),
            });

        return listeners;
    };

    return (
        <div className={classes.root}>
            <Lottie
                isStopped={false}
                options={{
                    loop: loop ? loop : false,
                    autoplay: autoplay ? autoplay : true,
                    animationData: animationMap[animation],
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                    },
                }}
                height={height ? height : 200}
                width={width ? width : 200}
                eventListeners={getEventListeners()}
            />
        </div>
    );
};

export default LottieAnimation;
