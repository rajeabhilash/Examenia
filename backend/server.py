from src.app import app

def main():
    print("Hello from backend!")

if __name__ == "__main__":
    main()
    import uvicorn
    uvicorn.run(app, host="0.0.0", port=8000, log_level="info")
    
