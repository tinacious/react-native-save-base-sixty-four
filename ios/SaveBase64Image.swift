@objc(SaveBase64Image)
class SaveBase64Image: NSObject {
    
    @objc(save:withOptions:withResolver:withRejecter:)
    func save(
        base64ImageString: String,
        options: Dictionary<String, Any>,
        resolve: RCTPromiseResolveBlock,
        reject: RCTPromiseRejectBlock
    ) -> Void {
        guard let image = decodeBase64ToImage(encodedData: base64ImageString) else {
            return resolve(false)
        }
        
        UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil);
        resolve(true)
    }
    
    @objc(share:withOptions:withResolver:withRejecter:)
    func share(
        base64ImageString: String,
        options: Dictionary<String, Any>,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: RCTPromiseRejectBlock
    ) -> Void {
        guard let image = decodeBase64ToImage(encodedData: base64ImageString) else {
            return resolve(false)
        }
        
        guard let currentViewController = RCTPresentedViewController() else {
            return resolve(false)
        }

        let activityViewController = UIActivityViewController(activityItems: [image], applicationActivities: nil)
        DispatchQueue.main.async {
            currentViewController.present(activityViewController, animated: true) {
                resolve(true)
            }
        }
    }
}

func decodeBase64ToImage(encodedData: String) -> UIImage? {
    guard let data = Data.init(base64Encoded: encodedData) else {
        return nil
    }
    return UIImage(data: data)
}
