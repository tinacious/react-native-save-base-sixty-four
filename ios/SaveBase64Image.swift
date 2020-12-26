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
    

func decodeBase64ToImage(encodedData: String) -> UIImage? {
    guard let data = Data.init(base64Encoded: encodedData) else {
        return nil
    }
    return UIImage(data: data)
}
