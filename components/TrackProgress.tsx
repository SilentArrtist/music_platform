import React from 'react';
interface TrackProgressProps {
    left: number;
    right: number;
    width: string;
    onChange: (e: any) => void;
    changeType?: Function
}

const TrackProgress: React.FC<TrackProgressProps> =
    ({
        left, right, onChange, width, changeType = function (number: number) { return number }
    }) => {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <input
                    style={{
                        width
                    }}
                    type="range"
                    min={0}
                    max={right}
                    value={left}
                    onChange={onChange}
                />
                <div>{changeType(left)} / {changeType(right)}</div>
            </div>
        );
    };

export default TrackProgress;
