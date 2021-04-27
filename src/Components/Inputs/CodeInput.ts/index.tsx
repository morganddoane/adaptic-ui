import { TextField } from '@material-ui/core';
import React, { ReactElement } from 'react';

const CodeInput = (props: {
    value: string;
    onChange: (value: string) => void;
}): ReactElement => {
    const refs = [
        React.useRef<HTMLInputElement>(),
        React.useRef<HTMLInputElement>(),
        React.useRef<HTMLInputElement>(),
        React.useRef<HTMLInputElement>(),
        React.useRef<HTMLInputElement>(),
        React.useRef<HTMLInputElement>(),
    ];

    const edit = (index: number, val: string) => {
        if (val.length > 0) {
            // digit added
            if (val[index] === undefined) props.onChange(props.value + val);
        } else {
            // digit dropped
        }
    };

    return (
        <div>
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <TextField
                    inputRef={refs[index]}
                    style={{ width: 40, margin: 8 }}
                    key={'code' + index}
                    type="tel"
                    InputProps={{
                        style: { fontSize: '3rem', textAlign: 'center' },
                    }}
                    value={props.value[index] ? props.value[index] : ''}
                    onChange={(e) => edit(index, e.target.value)}
                />
            ))}
        </div>
    );
};

export default CodeInput;
