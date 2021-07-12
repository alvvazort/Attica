DELIMITER //

CREATE OR REPLACE TRIGGER triggerFiftyPhotos
    BEFORE INSERT ON Photos
    FOR EACH ROW
    BEGIN
        DECLARE photosUser INT;
        SET photosUser = (SELECT COUNT(*) 
                            FROM photos
                            WHERE userId = new.userId);
        IF(photosUser > 50) THEN
            SIGNAL SQLSTATE '45000' SET message_text = 
            'Áttica no admite más de 50 fotos por usuario.';
        END IF;
    END//

DELIMITER ;