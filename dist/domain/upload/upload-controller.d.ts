import { CloudinaryService } from './upload-service';
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImageFromUrl(body: {
        url: string;
    }): Promise<{
        message: string;
        result: string;
    }>;
}
