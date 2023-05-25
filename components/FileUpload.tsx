import React, { useRef } from 'react';

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children: any;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
    const ref = useRef<any>()

    const onChange = (e: any) => {
        setFile(e.target.files[0])
    }

    return (
        <div onClick={() => ref.current.click()}
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "100px",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}
        >
            <input
                type="file"
                accept={accept}
                style={{ display: "none" }}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;
