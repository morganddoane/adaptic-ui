import { TextField } from '@material-ui/core';
import { values } from 'lodash';
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

    const edit = (val: string) => {
        const string = val.slice(val.length - 1, val.length);
        if (string.length > 0 && props.value.length < 6) {
            const newVal = props.value + string;
            props.onChange(newVal);
            if (refs[newVal.length] && refs[newVal.length].current)
                refs[newVal.length].current?.focus();
        }
    };

    const keyDelete = (index: number) => {
        if (props.value.length > index) {
            props.onChange(props.value.slice(0, index));
            if (refs[index - 1] && refs[index - 1].current)
                refs[index - 1].current?.focus();
        } else {
            if (refs[index - 1] && refs[index - 1].current)
                refs[index - 1].current?.focus();
        }
    };

    return (
        <div>
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextField
                    inputRef={refs[index]}
                    style={{ width: 40, margin: 8 }}
                    key={'code' + index}
                    type="tel"
                    inputMode="numeric"
                    InputProps={{
                        style: { fontSize: '3rem', textAlign: 'center' },
                    }}
                    value={props.value[index] ? props.value[index] : ''}
                    onChange={(e) => edit(e.target.value)}
                    onKeyDown={(event) => {
                        const key = event.keyCode || event.charCode;

                        if (key == 8 || key == 46) {
                            keyDelete(index);
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default CodeInput;
