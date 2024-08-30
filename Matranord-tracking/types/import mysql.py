import mysql.connector

def insert_blob(name,adress,ville,tel,email,Cin,Idpays,CodeChauffeur,IdVehicule,NumPermis,Type,dateLivraison,dateFinValidite,Experience, filepath):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Lol_lol00",
        database="TruckTracking"
    )
    cursor = conn.cursor()

    with open(filepath, 'rb') as file:
        binary_data = file.read()

    sql = """INSERT INTO Chauffeur(
    NomChauffeur,
    Adresse,
    Ville,
    Tel1,
    Email,
    CIN,
    IdPays,
    CodeChauffeur,
    IdVehicule,
    NumPermis,
    Type,
    DateLivraison,
    DateFinValidite,
    Experience,
    ProfilePicture
) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)
"""
    data = (name,adress,ville,tel,email,Cin,Idpays,CodeChauffeur,IdVehicule,NumPermis,Type,dateLivraison,dateFinValidite,Experience, binary_data)
    cursor.execute(sql, data)
    conn.commit()
    cursor.close()
    conn.close()

# Example usage:
# insert_blob(1, 'John Doe', 'C:/Users/hp/Desktop/ESISA/TruckTracking-matranord/Matranord-tracking/assets/driver1.jpg')

insert_blob('John Doe', '123 Main St', 'New York', '1234567890', 'johndoe@example.com', 'A1234567', 1, 'CH001', 1, 'P1234567', 'B', '2021-01-01', '2031-01-01', 5,'C:/Users/hp/Desktop/ESISA/TruckTracking-matranord/Matranord-tracking/assets/driver1.jpg')
insert_blob('Jane Smith', '456 Elm St', 'Los Angeles', '2345678901', 'janesmith@example.com', 'B2345678', 2, 'CH002', 2, 'P2345678', 'C', '2020-02-01', '2030-02-01', 3, 'Matranord-tracking/assets/driver4.jpg')
insert_blob('Jim Brown', '789 Oak St', 'Chicago', '3456789012', 'jimbrown@example.com', 'C3456789', 3, 'CH003', 3, 'P3456789', 'D', '2019-03-01', '2029-03-01', 7, 'Matranord-tracking/assets/driver3.jpg')
insert_blob('Sara Wilson', '101 Pine St', 'Houston', '4567890123', 'sarawilson@example.com', 'D4567890', 4, 'CH004', 4, 'P4567890', 'A', '2018-04-01', '2028-04-01', 10, 'Matranord-tracking/assets/driver4.jpg')
insert_blob('Michael Johnson', '202 Maple St', 'Phoenix', '5678901234', 'michaeljohnson@example.com', 'E5678901', 5, 'CH005', 5, 'P5678901', 'B', '2017-05-01', '2027-05-01', 2, 'Matranord-tracking/assets/driver2.jpg')
insert_blob('Hamid Lhadi', '100 cartier zitoun', 'Tanger', '063545234', 'hamidLhadi@example.com', 'T356733', 6, 'DR605', 6, 'P5672452', 'B', '2015-07-01', '2028-07-01', 4, 'Matranord-tracking/assets/driver7.jpg')
insert_blob('youssef chaoui', '3 cartier chefchaouni', 'Fes', '064542511', 'yChaoui@example.com', 'CD124532', 7, 'CF231', 7, 'P442452', 'C', '2010-07-01', '2030-07-01', 6, 'Matranord-tracking/assets/driver8.jpg')

# insert_blob(2, 'Jane Smith', '../assets/driver4.jpg')
# insert_blob(3, 'Jim Brown', '../assets/driver3.jpg')
# insert_blob(4, 'Sara Wilson', '../assets/driver4.jpg')
# insert_blob(5, 'Michael Johnson', '../assets/driver5.avif')   
