@objc(SaveBase64Image)
class SaveBase64Image: NSObject {
    
    var resolver: RCTPromiseResolveBlock?
    var rejecter: RCTPromiseRejectBlock?
    
    @objc(save:withOptions:withResolver:withRejecter:)
    func save(
        base64ImageString: String,
        options: Dictionary<String, Any>,
        resolve:  @escaping RCTPromiseResolveBlock,
        reject:  @escaping RCTPromiseRejectBlock
    ) -> Void {
        guard let image = decodeBase64ToImage(base64ImageString) else {
            return resolve(false)
        }
        
        self.resolver = resolve
        self.rejecter = reject
        
        UIImageWriteToSavedPhotosAlbum(image, self, #selector(self.image(_:didFinishSavingWithError:contextInfo:)), nil)
    }
    
    @objc(share:withOptions:withResolver:withRejecter:)
    func share(
        base64ImageString: String,
        options: Dictionary<String, Any>,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        guard let image = decodeBase64ToImage(base64ImageString) else {
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
    
    @objc(image:didFinishSavingWithError:contextInfo:)
    func image(_ image: UIImage, didFinishSavingWithError error: NSError?, contextInfo: UnsafeRawPointer) {
        guard error == nil else {
            // Error saving image
            resolver?(false)
            return
        }

        // Image saved successfully
        resolver?(true)
    }
    
}

// Decode a clean base64 string into an image
func decodeBase64ToImage(_ encodedData: String) -> UIImage? {
    guard let data = Data.init(base64Encoded: cleanUpBase64String(encodedData)) else {
        return nil
    }
    return UIImage(data: data)
}

// Removes the base64 header
func cleanUpBase64String(_ base64String: String) -> String {
    return base64String
        .replacingOccurrences(of: "data:image/png;base64,", with: "")
        .replacingOccurrences(of: "data:image/jpg;base64,", with: "")
        .replacingOccurrences(of: "data:image/jpeg;base64,", with: "")
}
